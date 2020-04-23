import { ApiTags} from '@nestjs/swagger';
import { Controller, Post, Put, Body, BadRequestException} from '@nestjs/common';
import { CasesService } from './cases.service';
import { OfficersService } from '../officers/officers.service';
import { CreateCaseEntity, CaseToUpdateEntity } from './cases.entity';

@ApiTags('case')
@Controller('case')
export class CasesController {
  constructor(private readonly casesService: CasesService, private readonly officersService: OfficersService) {
  }

  @Post('create')
  async create(@Body() createCase: CreateCaseEntity) {
    try {
      console.log('case controller create fn:');

      const res = {
        status: 200,
        message: "Your case is registered. An officer will be assigned asap for follow up"
      };

      // find the available officer and assign the case to that officer if available
      const officerAvailable = await this.officersService.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        criteria: {
          onDuty: true,
          status: 'ACTIVE',
          isAvailable: true,
        },
      });

      if (officerAvailable && 'id' in officerAvailable) createCase['officer'] = officerAvailable.id;

      const newCase = await this.casesService.save(createCase);

      if (officerAvailable && 'id' in officerAvailable) {
        await this.officersService.update({
          id: officerAvailable.id,
          isAvailable: false,
        });
        res.message = `Your case is registered and officer ${officerAvailable.firstName} ${officerAvailable.lastName} has been assigned to your case for follow up`;
      }

      return res;

    } catch (e) {
      console.log('error in case controller create fn:', e);
      throw new BadRequestException(e);
    }
  }

  @Put('update')
  async update(@Body() caseToUpdate: CaseToUpdateEntity) {
    try {
      console.log('case controller update fn:');

      await this.casesService.update(caseToUpdate);

      if ('isResolved' in caseToUpdate && caseToUpdate.isResolved) {
        const newCase = await this.casesService.findOne({
          attributes: ['id'],
          criteria: { isResolved: false, status: 'ACTIVE' },
        });

        /*
          case exist -> assign to officer else -> officer isAvailable -> true
        */
        if (newCase && 'id' in newCase) {
          await this.casesService.update({
            id: newCase.id,
            officer: caseToUpdate.officer,
          });
        } else {
          await this.officersService.update({
            id: caseToUpdate.officer,
            isAvailable: true,
          });
        }
      }

      return {
        status: 200,
        message: "Case has been updated."
      };
    } catch (e) {
      console.log('error in case controller update fn:', e);
      throw new BadRequestException(e);
    }
  }
}

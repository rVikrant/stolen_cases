import { Controller, Post, Put, Body } from '@nestjs/common';
import { CasesService } from './cases.service';
import { OfficersService } from '../officers/officers.service';

interface NewCase {
  user: number,
  bikeNo: string,
  latitude: number,
  bikeColor: string,
  longitude: number
}

interface CaseToUpdate {
  id: number,
  bikeNo: string,
  status: string
  officer: number,
  latitude: number,
  bikeColor: string,
  longitude: number,
  isResolved: boolean,
}


@Controller('case')
export class CasesController {
  constructor(private readonly casesService: CasesService, private readonly officersService: OfficersService) {
  }

  @Post('create')
  async create(@Body() newCase: NewCase) {
    try {
      console.log('case controller create fn:');

      // find the available officer and assign the case to that officer if available
      const officerAvailable = await this.officersService.findOne({
        attributes: ['id'],
        criteria: {
          onDuty: true,
          status: 'ACTIVE',
          isAvailable: true,
        },
      });

      if (officerAvailable && 'id' in officerAvailable) newCase['officer'] = officerAvailable.id;

      newCase = await this.casesService.save(newCase);

      if (officerAvailable && 'id' in officerAvailable)
        await this.officersService.update({
          id: officerAvailable.id,
          isAvailable: false,
        });

      return newCase;

    } catch (e) {
      console.log('error in case controller create fn:', e);
      throw e;
    }
  }

  @Put('update')
  async update(@Body() caseToUpdate: CaseToUpdate) {
    try {
      console.log('case controller update fn:');

      await this.casesService.update(caseToUpdate);

      if ('isResolved' in caseToUpdate && caseToUpdate.isResolved) {
        const newCase: CaseToUpdate = await this.casesService.findOne({
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

      return {};
    } catch (e) {
      console.log('error in case controller update fn:', e);
      throw e;
    }
  }
}

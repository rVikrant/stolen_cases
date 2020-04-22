import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Case } from '../models/case.model';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(Case)
    private caseModel: typeof Case,
  ) {}

  // save case service function
  async save(data: object): Promise<Case> {
    try {
      return this.caseModel.create(data);
    } catch (e) {
      throw e;
    }
  }

  // update case
  async update(data: object): Promise<void> {
    try {
      const criteria = {
        id: data['id'],
      };

      delete data['id'];

      await this.caseModel.update(data, { where: criteria, limit: 1 });

      return;
    } catch (e) {
      throw e;
    }
  }

  findOne(query: object): Promise<Case> {
    return this.caseModel.findOne({attributes: query['attributes'],where: query['criteria']})
  }
}

import { Injectable } from '@nestjs/common';
import {Officer} from '../models/officer.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OfficersService {

  constructor(
    @InjectModel(Officer)
    private officerModel: typeof Officer,
  ) {}

  findOne(query: object): Promise<Officer> {
    return this.officerModel.findOne({attributes: query['attributes'],where: query['criteria']})
  }

  // update officer
  async update(data: object): Promise<void> {
    try {
      const criteria = {
        id: data['id'],
      };

      delete data['id'];

      await this.officerModel.update(data, { where: criteria });

      return;
    } catch (e) {
      throw e;
    }
  }
}

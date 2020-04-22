import { ApiProperty } from '@nestjs/swagger';

// create case entity for api
export class CreateCaseEntity {
  @ApiProperty()
  user: number;

  @ApiProperty()
  bikeNo: string;

  @ApiProperty()
  latitude?: number;

  @ApiProperty()
  bikeColor: string;

  @ApiProperty()
  longitude?: number;
}


//  case update
export class CaseToUpdateEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({required: false})
  bikeNo?: string;

  @ApiProperty({required: false, enum: ["ACTIVE", "BLOCKED", "DELETED"]})
  status?: string;

  @ApiProperty({required: false})
  officer?: number;

  @ApiProperty({required: false, minimum: -90, maximum: 90})
  latitude?: number;

  @ApiProperty({required: false})
  bikeColor?: string;

  @ApiProperty({required: false, minimum: -180, maximum: 180})
  longitude?: number;

  @ApiProperty({required: false})
  isResolved?: boolean;
}
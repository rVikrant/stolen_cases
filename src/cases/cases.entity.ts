import { IsString, IsInt, Min, Max, IsEnum, IsBoolean, IsOptional, IsPositive } from 'class-validator';

// create case entity for api
export class CreateCaseEntity {
  // @ApiProperty()
  @IsInt()
  @IsPositive()
  user: number;

  // @ApiProperty()
  @IsString()
  bikeNo: string;

  // @ApiProperty()
  @IsInt()
  @Min(-90)
  @Max(90)
  latitude?: number;

  // @ApiProperty()
  @IsString()
  bikeColor: string;

  // @ApiProperty()
  @IsInt()
  @Min(-180)
  @Max(180)
  longitude?: number;
}


//  case update
export class CaseToUpdateEntity {
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsOptional()
  bikeNo: string;

  @IsEnum(["ACTIVE", "BLOCKED", "DELETED"])
  @IsOptional()
  status: string;

  @IsInt()
  @IsPositive()
  officer: number;

  @IsInt()
  @Min(-90)
  @Max(90)
  @IsOptional()
  latitude?: number;

  @IsString()
  bikeColor?: string;

  @IsInt()
  @IsOptional()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsBoolean()
  isResolved: boolean;
}
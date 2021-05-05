// Models
export class Address {
  street: string;
  wardId: number;
  districtId: number;
  cityId: number;

  constructor(fullAddress) {
    this.street = fullAddress.street;
    this.wardId = fullAddress.wardId;
    this.districtId = fullAddress.districtId;
    this.cityId = fullAddress.cityId;
  }
}

export class AddressModel {
  wardId: number;
  wardName: string;
  districtId: number;
  districtName: string;
  cityId: number;
  cityName: string;
  street: string;
}

export enum EnumAddress{
  STREET,
  WARD,
  DISTRICT,
  CITY
}

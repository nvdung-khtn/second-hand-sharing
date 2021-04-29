// Models
export class Address {
  street: string;
  wardId: number;
  districtId: number;
  cityId: number;

  constructor(fullAddress) {
    this.street = fullAddress.street;
    this.wardId = fullAddress.ward.id;
    this.districtId = fullAddress.district.id;
    this.cityId = fullAddress.province.id;
  }
}

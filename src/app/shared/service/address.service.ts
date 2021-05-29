import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address, AddressModel } from 'src/app/core/constants/address.constant';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  async getAllCity() {
    // [{cityId: 1, cityName: "Ha Noi"}]
    const citys: any[] = [];
    let guardNumber: number = 1;
    const data = await this.http
      .get<Address[]>('assets/address.json', { responseType: 'json' })
      .toPromise();

    // Filter 63 province in VN
    data.forEach((address) => {
      if (address.cityId >= guardNumber) {
        guardNumber = address.cityId + 1;
        citys.push(address);
      }
    });

    return citys;
  }

  async getAllDistrict(cityId: number) {
    const districts: any[] = [];
    let guardNumber: number = 1;
    const data = await this.http
      .get<Address[]>('assets/address.json', { responseType: 'json' })
      .toPromise();

    // Filter all district that match with condition
    data.forEach((address) => {
      if (address.cityId === cityId && address.districtId >= guardNumber) {
        guardNumber = address.districtId + 1;
        districts.push(address);
      }
    });

    return districts;
  }

  async getAllWard(cityId: number, districtId: number) {
    const wards: any[] = [];
    let guardNumber: number = 1;
    const data = await this.http
      .get<Address[]>('assets/address.json', { responseType: 'json' })
      .toPromise();

    // Filter all ward that match with condition
    data.forEach((address) => {
      if (
        address.cityId === cityId &&
        address.districtId === districtId &&
        address.wardId >= guardNumber
      ) {
        guardNumber = address.wardId + 1;
        wards.push(address);
      }
    });

    return wards;
  }

  convertAddressToAddressString(address: AddressModel) {
    return `${address.street} ${address.wardName} ${address.districtName} ${address.cityName}`;
  }

  async getAddressString(address: Address): Promise<string> {
    const data = await this.http
      .get<AddressModel[]>('assets/address.json', { responseType: 'json' })
      .toPromise();

    const result = data.find(
      (res) =>
        res.cityId === address.cityId &&
        res.districtId === address.districtId &&
        res.wardId === address.wardId
    );

    return `${address.street}, ${result.wardName}, ${result.districtName}, ${result.cityName}`;
  }

  async getAddressById(
    cityId: number,
    districtId: number,
    wardId: number,
    street: string
  ): Promise<AddressModel> {
    const data = await this.http
      .get<Address[]>('assets/address.json', { responseType: 'json' })
      .toPromise();

    const result = data.find(
      (address) =>
        address.cityId === cityId &&
        address.districtId === districtId &&
        address.wardId === wardId
    );
    return <AddressModel>{ ...result, street };
  }
}

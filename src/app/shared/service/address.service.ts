import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/core/constants/address.constant';

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

      data.forEach((address) => {
        if (address.cityId === cityId && address.districtId === districtId && address.wardId >= guardNumber) {
          guardNumber = address.wardId + 1;
          wards.push(address);
        }
      });

      return wards;
  }
}

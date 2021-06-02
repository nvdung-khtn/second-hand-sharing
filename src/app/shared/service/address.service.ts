import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    private _address: AddressModel[];
    constructor(private http: HttpClient) {}

    private async loadData(): Promise<void> {
        if (!this._address) {
            this._address = await this.http
                .get<AddressModel[]>('assets/address.json', {
                    responseType: 'json',
                })
                .toPromise();
        }
    }

    // Bởi vì subscribe trả về 1 subscription nên ko thể await đc, và subscribe là Async nên việc ko await được có thể sai flow.
    // Nên sử dụng subscribe() trong top-level thì đạt hiệu quả tối ưu hơn.
    // private async loadDataVer2(): Promise<void> {
    //   if (!this._address) {
    //     this.http
    //       .get<AddressModel[]>('assets/address.json', {
    //         responseType: 'json',
    //       })
    //       .subscribe((data) => (this._address = data));
    //   }
    // }

    async getAllCity(): Promise<AddressModel[]> {
        await this.loadData();
        const citys: AddressModel[] = [];
        let guardNumber: number = 1;

        // Filter 63 province in VN
        this._address.forEach((address) => {
            if (address.cityId >= guardNumber) {
                guardNumber = address.cityId + 1;
                citys.push(address);
            }
        });

        return citys;
    }

    async getAllDistrict(cityId: number): Promise<AddressModel[]> {
        await this.loadData();
        const districts: AddressModel[] = [];
        let guardNumber: number = 1;

        // Filter all district that match with condition
        this._address.forEach((address) => {
            if (address.cityId === cityId && address.districtId >= guardNumber) {
                guardNumber = address.districtId + 1;
                districts.push(address);
            }
        });

        return districts;
    }

    async getAllWard(cityId: number, districtId: number): Promise<AddressModel[]> {
        await this.loadData();
        const wards: any[] = [];
        let guardNumber: number = 1;

        // Filter all ward that match with condition
        this._address.forEach((address) => {
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

    getAddressString(address: AddressModel): string {
        return `${address.street}, ${address.wardName}, ${address.districtName}, ${address.cityName}`;
    }

    async getAddressVMById(addr: AddressIdModel): Promise<AddressModel> {
        await this.loadData();
        const result = this._address.find(
            (address) =>
                address.cityId === addr.cityId &&
                address.districtId === addr.districtId &&
                address.wardId === addr.wardId
        );
        return <AddressModel>{ ...result, street: addr.street };
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    // tslint:disable-next-line: variable-name
    private _address: AddressModel[];
    constructor(private http: HttpClient) {}

    async loadData(): Promise<void> {
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
        let guardNumber = 1;

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
        let guardNumber = 1;

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
        let guardNumber = 1;

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

    // getAddressString(address: AddressModel): string {
    //     const wardName = this.removeWordFromString(address.wardName, ['Phường', 'Xã']);
    //     const districtName = this.removeWordFromString(address.districtName, [
    //         'Thành phố',
    //         'Huyện',
    //         'Quận',
    //         'Thị xã',
    //         'Thị trấn',
    //     ]);
    //     const cityName = this.removeWordFromString(address.cityName, ['Thành phố', 'Tỉnh']);
    //     return `${address.street}, P.${wardName}, Q.${districtName}, ${cityName}`;
    // }
    getAddressString(addressId: AddressIdModel): string {
        const address = this.getAddressVMById(addressId);
        const wardName = this.removeWordFromString(address.wardName, ['Phường', 'Xã']);
        const districtName = this.removeWordFromString(address.districtName, [
            'Thành phố',
            'Huyện',
            'Quận',
            'Thị xã',
            'Thị trấn',
        ]);
        const cityName = this.removeWordFromString(address.cityName, ['Thành phố', 'Tỉnh']);
        return `${address.street}, P.${wardName}, Q.${districtName}, ${cityName}`;
    }

    // tslint:disable-next-line: typedef
    removeWordFromString(sourceString: string, removeWord: string[]) {
        if (removeWord.length) {
            removeWord.forEach((word) => {
                if (sourceString) { sourceString = sourceString.replace(word, ''); }
            });
        }
        if (sourceString) {
            return sourceString.trim();
        }
    }

    getAddressVMById(addr: AddressIdModel): AddressModel {
        const result =
            this._address &&
            this._address.find(
                (address) =>
                    address.cityId === addr.cityId &&
                    address.districtId === addr.districtId &&
                    address.wardId === addr.wardId
            );
        return { ...result, street: addr.street } as AddressModel;
    }
}

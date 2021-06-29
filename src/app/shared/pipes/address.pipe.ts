import { Pipe, PipeTransform } from '@angular/core';
import { AddressIdModel } from 'src/app/core/constants/address.constant';
import { AddressService } from '../service/address.service';

@Pipe({
    name: 'address',
})
export class AddressPipe implements PipeTransform {
    constructor(private addressService: AddressService) {}

    transform(address: AddressIdModel): string {
        if (address !== null && address.cityId && address.districtId & address.wardId) {
            return this.addressService.getAddressString(address);
        } else return 'Chưa cập nhật địa chỉ';
    }
}

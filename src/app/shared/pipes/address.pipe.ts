import { Pipe, PipeTransform } from '@angular/core';
import { AddressIdModel } from 'src/app/core/constants/address.constant';
import { AddressService } from '../service/address.service';

@Pipe({
    name: 'address',
})
export class AddressPipe implements PipeTransform {
    constructor(private addressService: AddressService) {}

    transform(address: AddressIdModel): string {
        return this.addressService.getAddressString(address);
    }
}

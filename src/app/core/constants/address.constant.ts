// Models
export class AddressIdModel {
    street: string;
    wardId: number;
    districtId: number;
    cityId: number;

    constructor(address) {
        this.street = address.street;
        this.wardId = address.wardId;
        this.districtId = address.districtId;
        this.cityId = address.cityId;
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

export enum EnumAddress {
    STREET,
    WARD,
    DISTRICT,
    CITY,
}

// Models
export class AddressIdModel {
    street: string;
    wardId: number;
    districtId: number;
    cityId: number;

    constructor(cityId, districtId, wardId, street) {
        this.street = street;
        this.wardId = wardId;
        this.districtId = districtId;
        this.cityId = cityId;
    }
}

export class AddressModel {
    wardId: number;
    wardName?: string;
    districtId: number;
    districtName?: string;
    cityId: number;
    cityName?: string;
    street: string;
}

export enum EnumAddress {
    STREET,
    WARD,
    DISTRICT,
    CITY,
}

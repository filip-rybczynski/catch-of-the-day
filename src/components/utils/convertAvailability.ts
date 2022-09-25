
import {Availability} from "./../types";

type AvailabilityTypes = boolean | Availability;
type ReturnType<T> = T extends string ? boolean : Availability

export function convertAvailability<T extends AvailabilityTypes> (isAvailable: T): ReturnType<T> {

    if (typeof isAvailable === "boolean") {
        return ((isAvailable as boolean) ? "available" : "unavailable") as ReturnType<T>;
        
    } else return ((isAvailable as Availability) === 'available') as ReturnType<T>
    
}
export class EmployeeModel {
    id: any = 0;
    status: boolean;
    user_id: string;
    date_of_joining: Date;
    year_of_experiance: number;
    date_of_birth: Date;
    address: string;
    country_id: string;
    state_id: string;
    city_id: string;
    zip_code: number;
    first_name: string;
    last_name:string;
    email:string;
    mobile:number;
    department:any;
}

export class EmployeeQualificationModel {
    id: any = 0;
    status: boolean;
    employee_id: string;
    qualification_id: string;
    year_of_completion: any;
    certificate_name: string;
    duration: string;
}
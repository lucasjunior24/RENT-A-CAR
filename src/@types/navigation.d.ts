export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            CarDetails: { car: CarDTO };
            MyCars: undefined;
            
            Scheduling: { car: CarDTO };
            SchedulingDetails: { car: CarDTO, dates: any };
            SignUpSecondStep: undefined;
            MyCars: undefined;
            Confirmation: { title: string, message: string, nextScreenRoute: string};
        }
    }
}
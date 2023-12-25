export default interface IBudget {
    value: number;
    type: string;
    email: string;
    createdBy: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

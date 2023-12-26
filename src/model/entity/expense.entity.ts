export default interface IExpense {
    value: number;
    type: string;
    email: string;
    comment: string;
    isDeleted?: boolean;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: string;
}
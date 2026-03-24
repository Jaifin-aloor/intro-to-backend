import User from "./user.model";
import Expense  from "./expense.model";

User.hasMany(Expense, {
    foreignKey: "userId",
    as: "expenses"
});

Expense.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

export { User, Expense };
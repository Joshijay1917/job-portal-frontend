export function formatSalary(salary: { min: number, max: number }) {
    return `₹${salary.min} - ₹${salary.max}`
}
import { z } from 'zod'

export const createSubscriptionSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2),

    price: z
    .number()
    .min(0, 'Price must be greater than 0'),

    frequency: z
    .enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),

    currency: z
    .enum(['USD', 'EUR', 'GBP']),

    category: z
    .enum(['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other']),

    paymentMethod: z
    .string()
    .trim(),

    status: z
    .enum(['active', 'cancelled', 'expired']),

    startDate: z
    .coerce.date(),

    renewalDate: z
    .coerce.date(),

    userID: z
    .string()

})
.transform((data) => {

    let { renewalDate, startDate, frequency, status } = data

    if(!data.renewalDate) {
        const renewalPeriods = {
            DAILY: 1,
            WEEKLY: 7,
            MONTHLY: 30,
            YEARLY: 365,
        }

        renewalDate = new Date(startDate)

        renewalDate.setDate(
            renewalDate.getDate() + renewalPeriods[frequency]
        )
    }

    if (renewalDate < new Date()) {
        status = 'expired'
    }

    return {
        ...data,
        renewalDate
    }
})
.refine(
    (data) => data.renewalDate > data.startDate, {
        message: "Renewal date must be after the start date",
        path: ["renewalDate"],
    }
)
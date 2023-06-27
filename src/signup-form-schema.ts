import z from 'zod';

const phoneNumberRegexp = new RegExp(
  /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
);
const FIELD_REQUIRED_STR = 'This field is required';
export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;

export const signUpFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters')
    .trim(),

  surname: z
    .string({
      invalid_type_error: 'Surname must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters')
    .trim(),

  phoneNumber: z
    .string({
      invalid_type_error: 'Phone number must be a number',
      required_error: FIELD_REQUIRED_STR,
    })
    .regex(phoneNumberRegexp, 'Invalid phone number'),

  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .email('Email is invalid'),

  gender: z.enum(GENDER_OPTIONS, {
    required_error: FIELD_REQUIRED_STR,
    invalid_type_error: `Invalid gender, must be one of the followings: ${GENDER_OPTIONS.join(
      ', '
    )}`,
  }),

  birthDate: z
    .date({
      invalid_type_error: 'Birth date must be a date',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(new Date('1900-01-01'), 'Invalid date time, too old')
    .max(new Date('2023-01-01'), 'Invalid date time, too young')
    .default(new Date()),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

import { check } from 'express-validator';

export const consultantCreateValidator = [
  check('consultantImage')
    .not()
    .isEmpty()
    .withMessage('Consultant image is required for security purpose'),
  check('promoImage')
    .not()
    .isEmpty()
    .withMessage('Promo image is required for good branding'),
  check('promoDescription')
    .isLength({ min: 15 })
    .withMessage('Promo description must be at least 15 characters long.'),
  check('promoDescription')
    .isLength({ max: 50 })
    .withMessage('Promo desc must not be greater than 50 char long'),
  check('mainMarketingHead')
    .isLength({ min: 15 })
    .withMessage('Main market head must be atleast 15 char long.'),
  check('mainMarketingHead')
    .isLength({ max: 50 })
    .withMessage('Main market head must not be greater than 50 char long'),
  check('elaboration')
    .isLength({ min: 20 })
    .withMessage('Elaboration must be atleast 20 char long.'),
  check('elaboration')
    .isLength({ max: 200 })
    .withMessage('Elaboration must not be greater than 200 char long'),
  check('nicheArea')
    .isLength({ max: 200 })
    .withMessage('Niche area must not be greater than 40 char long'),
  check('phone')
    .isLength({ min: 10 })
    .withMessage('Phone must be 10 characters long '),
];

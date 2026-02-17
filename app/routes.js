//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ————————————————————————————————————————
// Helper: determine pronoun from session
// ————————————————————————————————————————

function getPronoun (req) {
  return req.session.data['applying-for'] === 'someone-else' ? 'their' : 'your'
}

// ————————————————————————————————————————
// Page 2 — Eligibility (POST)
// ————————————————————————————————————————

router.post('/eligibility-answer', function (req, res) {
  var applyingFor = req.session.data['applying-for']

  if (!applyingFor) {
    return res.render('eligibility', {
      errors: [
        {
          text: 'Select who you are applying for',
          href: '#applying-for'
        }
      ]
    })
  }

  res.redirect('/criterion')
})

// ————————————————————————————————————————
// Page 3 — Criterion (POST)
// ————————————————————————————————————————

router.post('/criterion-answer', function (req, res) {
  var criterion = req.session.data['criterion']

  if (!criterion) {
    return res.render('criterion', {
      errors: [
        {
          text: 'Select what criterion you want to apply under',
          href: '#criterion'
        }
      ]
    })
  }

  res.redirect('/personal-details')
})

// ————————————————————————————————————————
// Page 4 — Personal details (GET)
// ————————————————————————————————————————

router.get('/personal-details', function (req, res) {
  var pronoun = getPronoun(req)

  res.render('personal-details', {
    pronoun: pronoun
  })
})

// ————————————————————————————————————————
// Page 4 — Personal details (POST)
// ————————————————————————————————————————

router.post('/personal-details-answer', function (req, res) {
  var pronoun = getPronoun(req)
  var data = req.session.data

  var firstName = (data['first-name'] || '').trim()
  var lastName = (data['last-name'] || '').trim()
  var dobDay = (data['dob-day'] || '').trim()
  var dobMonth = (data['dob-month'] || '').trim()
  var dobYear = (data['dob-year'] || '').trim()
  var email = (data['email'] || '').trim()

  var errors = []
  var firstNameError, lastNameError, dobError, emailError
  var dobDayError = false
  var dobMonthError = false
  var dobYearError = false

  // Validate first name
  if (!firstName) {
    firstNameError = 'Enter ' + pronoun + ' first name'
    errors.push({ text: firstNameError, href: '#first-name' })
  }

  // Validate last name
  if (!lastName) {
    lastNameError = 'Enter ' + pronoun + ' last name'
    errors.push({ text: lastNameError, href: '#last-name' })
  }

  // Validate date of birth
  var dobDayMissing = !dobDay
  var dobMonthMissing = !dobMonth
  var dobYearMissing = !dobYear

  if (dobDayMissing || dobMonthMissing || dobYearMissing) {
    if (dobDayMissing && dobMonthMissing && dobYearMissing) {
      dobError = 'Enter ' + pronoun + ' date of birth'
    } else if (dobDayMissing && dobMonthMissing) {
      dobError = 'Date of birth must include a day and month'
    } else if (dobDayMissing && dobYearMissing) {
      dobError = 'Date of birth must include a day and year'
    } else if (dobMonthMissing && dobYearMissing) {
      dobError = 'Date of birth must include a month and year'
    } else if (dobDayMissing) {
      dobError = 'Date of birth must include a day'
    } else if (dobMonthMissing) {
      dobError = 'Date of birth must include a month'
    } else if (dobYearMissing) {
      dobError = 'Date of birth must include a year'
    }

    dobDayError = dobDayMissing
    dobMonthError = dobMonthMissing
    dobYearError = dobYearMissing

    errors.push({ text: dobError, href: '#dob-day' })
  }

  // Validate email
  if (!email) {
    emailError = 'Enter ' + pronoun + ' email address'
    errors.push({ text: emailError, href: '#email' })
  }

  // If validation errors, re-render with errors
  if (errors.length > 0) {
    return res.render('personal-details', {
      pronoun: pronoun,
      errors: errors,
      firstNameError: firstNameError,
      lastNameError: lastNameError,
      dobError: dobError,
      dobDayError: dobDayError,
      dobMonthError: dobMonthError,
      dobYearError: dobYearError,
      emailError: emailError
    })
  }

  res.redirect('/check-answers')
})

// ————————————————————————————————————————
// Page 5 — Check answers (POST)
// ————————————————————————————————————————

router.post('/check-answers-answer', function (req, res) {
  res.redirect('/confirmation')
})

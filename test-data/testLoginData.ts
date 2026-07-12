export const testLoginData = [
    {
        testName: 'Valid Login',
        username: 'tomsmith',
        password: 'SuperSecretPassword!',
        expected: 'Success',
        successMessage: 'Welcome to the Secure Area',
    },
    {
        testName: 'Invalid Login',
        username: 'tomsmith',
        password: 'Wrong',
        expected: 'Failure',
        errorMessage: /invalid!/i,
    }

]
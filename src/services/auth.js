import instance from './instance';

// define the authentication service
const authService = {
    signup: async (user) => {
        try {
            console.log('Registering user...');
            const res = await instance.authInstance.post('/users/signup', user);

            console.log(res.data);

            if (res.data) {
                console.log('User registered successfully');
                return res.data;
            } else {
                console.log('Error registering user');
                return res.data;
            }
        } catch (error) {
            console.log('Error registering user');
            return error.response.data;
        }
    },

    signin: async (user) => {
        try {
            console.log('Authenticating user...');
            const res = await instance.authInstance.post('/users/signin', user);

            console.log(res.data);

            if (res.data) {
                console.log('User authenticated successfully');

                // store the token in the session storage
                sessionStorage.setItem('token', res.data.token);

                // store the user in the session storage
                sessionStorage.setItem('user', JSON.stringify({
                    username: res.data.username, name: res.data.name
                }));

                return res.data;
            } else {
                console.log('Error authenticating user');
                return res.data;
            }
        } catch (error) {
            console.log('Error authenticating user');
            return error.response.data;
        }
    }
}

export default authService;
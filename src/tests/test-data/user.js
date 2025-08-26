const validUser = [
    {
        username: "standard_user",
        password: "secret_sauce"
    },

    {
        username: "performance_glitch_user",
        password: "secret_sauce"
    },

    {
        username: "visual_user",
        password: "secret_sauce"
    },
    
];

const inValidUser = [
    {
        username: "locked_out_user",
        password: "secret_sauce"
    },

    {
        username: "testt_user",
        password: "test_sauce"
    }



];

const problemUser = [
    {
        username: "problem_user",
        password: "secret_sauce"
    },
        
    {
        username: "error_user",
        password: "secret_sauce"
    }
];

module.exports = {
    validUser,
    problemUser,
    inValidUser,
}
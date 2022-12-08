namespace API.Handlers
{
    public class Hashing
    {
        private static string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        public static string HashPassword(string Password)
        {
            return BCrypt.Net.BCrypt.HashPassword(Password, GetRandomSalt());
        }

        public static bool validatePassword(string password, string currentHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, currentHash);
        }
    }
}

using API.Handlers;
using API_SystemSekolah.Context;
using API_SystemSekolah.Repositories.Data;
using API_SystemSekolah.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_SystemSekolah.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AccountSiswaController : ControllerBase
    {
        private AccountSiswaRepository account;
        private MyContext context;
        private IConfiguration _configuration;
        public AccountSiswaController(AccountSiswaRepository repository, MyContext mycontext, IConfiguration configuration)
        {
            this.account = repository;
            this.context = mycontext;
            this._configuration = configuration;
        }
        //[AllowAnonymous]
        [HttpPost("Login")]
        public ActionResult Login(LoginSiswaViewModel Login)
        {
            try
            {
                var data = account.Login(Login.Email, Login.Password);
                if (data==null)
                {
                    return Ok(new
                    {
                        Message = "Email/Password salah",
                        StatusCode = 200
                    });
                }
                else
                {
                    string token = Token(Login.Email, Login.Password);
                    return Ok(new
                    {
                        Message = "Berhasil Login",
                        StatusCode = 200,
                        Data = data,
                        token
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Message = ex.Message,
                    StatusCode = 400
                }) ;
            }
        }
        [HttpPut("Change_Password")]
        public ActionResult ChangePassword(string email, string password, string baru)
        {
            try
            {
                var data = account.ChangePassword(email, password, baru);
                if (data == null)
                {
                    return Ok(new
                    {
                        Message = "Password Lama Anda Salah",
                        StatusCode = 200
                    });
                }
                else
                {
                    return Ok(new
                    {
                        Message = "berhasil Mengganti Password",
                        StatusCode = 200,
                        Data = data
                    });
                }
            }
            catch (Exception e)
            {

                return BadRequest(new
                {
                    Message = e.Message,
                    StatusCode = 400
                });
            }
        }
        //Forgot Password

        [HttpPut("Forgot_Password")]
        public ActionResult ForgotPassword(string email, string password, string baru)
        {
            try
            {
                var data = account.ForgotPassword(email, password, baru);
                if (data == null)
                {
                    return Ok(new
                    {
                        Message = "Password tidak sama",
                        StatusCode = 200
                    });
                }
                else
                {
                    return Ok(new
                    {
                        Message = "Berhasil Mengganti Password",
                        StatusCode = 200,
                        Data = data
                    });
                }
            }
            catch (Exception e)
            {

                return BadRequest(new
                {
                    Message = e.Message,
                    StatusCode = 400
                });
            }
        }

        private string Token(string email, string password)
        {
            var data = context.Siswas.FirstOrDefault(option =>
            option.Email.Equals(email));

            //Hashing.validatePassword(password, data.Password)
            bool validate = Hashing.validatePassword(password, data.Password);
            if (validate)
            {
                var claims = new[] {
                            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                            new Claim("Name", data.Name),
                            new Claim("email", data.Email),
                           //new Claim("id",data.),
                            //new Claim("role", data.Role.Name)
                        };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);
                var tokenCode = new JwtSecurityTokenHandler().WriteToken(token);
                return tokenCode;
            }
            return null;
        }
    }
}

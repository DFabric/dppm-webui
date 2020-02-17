require "kemal"
require "jwt"
require "json"

struct LoginInfo
  include JSON::Serializable
  property username : String
  property password : String
end
CONFIG = Set(LoginInfo).from_json(read_file("#{__DIR__}/../../dppm_api_config.json"))

post "/sign_in" do |env|
  creds = LoginInfo.from_json(env.params.json)
  if CONFIG.includes?(creds)
    # generate JWT
  else
    raise "Unauthorized"
  end
end

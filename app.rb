require 'sinatra'
require 'haml'

set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
  haml :index
end

get '/sjis/:str' do
  URI.encode(URI.encode(params[:str].encode "Shift_JIS"))
end

require 'sinatra'
require 'haml'

set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
  haml :index
end

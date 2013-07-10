class TweetWorker
  include Sidekiq::Worker

  def perform(tweet_id)
    sleep 1000

    tweet = Tweet.find(tweet_id)
    user  = tweet.user
    # p "<<<<<<<<<<<<<<<<<<<<<<<"
    # p ENV
 

    # Twitter.configure do |config|
    #   config.consumer_key = ENV['TWITTER_KEY']
    #   config.consumer_secret = ENV['TWITTER_SECRET']
    #   config.oauth_token =  user.oauth_token
    #   config.oauth_token_secret = user.oauth_secret
    # end

    user.twitter.update(tweet.text)

    # set up Twitter OAuth client here
    # actually make API call
    # Note: this does not have access to controller/view helpers
    # You'll have to re-initialize everything inside here
  end
end

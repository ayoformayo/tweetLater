class User < ActiveRecord::Base
  has_many :tweets

  def tweet(text)
    tweet = tweets.create!(:text => text)
    TweetWorker.perform_async(tweet.id)
  end

  def twitter
    @twitter ||= Twitter::Client.new(oauth_token: self.oauth_token, oauth_token_secret: self.oauth_secret)
  end
end

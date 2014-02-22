coffieend
=========

###API's
+ Google Maps JavaScript API v3

###Models
+ ActiveRecord
    + `User`
        + `email`
        + `first_name`
        + `last_name`
        + `job`
        + `age`
        + `sex`
        + `self_summary`
        + `photo`   
        + `session_token`
        + `password_digest`

    + `Attending`
        + `user_id`
        + `hangout_id`

    + `Hangout`
        + `user_id`
        + `lat`
        + `lng`
        + `start`
        + `end`
   
    + `Friendship`
        + `primary_id`
        + `foreign_id`

    + `FriendshipRequest`
        + `requester_id`
        + `requested_id`

+ Backbone
    + `

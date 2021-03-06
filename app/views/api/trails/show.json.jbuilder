json.trail do
    json.extract! @trail, :id, :name, :difficulty, :summary, :description, :length, :elevation_gain, :route_type, :usage, :park_id, :lat, :lng
    json.coverPhotoUrl url_for(@trail.coverPhoto)

    json.tags do 
        @trail.tags.each do |tag|
            json.set! tag.id do
                json.extract! tag, :id, :name, :tag_type
            end
        end
    end
end




json.taggable do
    @trail.taggables.each do |taggable|
        json.set! taggable.id do 
            json.extract! taggable, :id, :tag_id, :taggable_id, :taggable_type
        end
    end
end


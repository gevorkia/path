import React from "react";
import { connect } from "react-redux";
import { createReview, clearReviewErrors } from "../../actions/review_actions";
import { closeModal } from "../../actions/modal_actions";

import {
  defaultActivity,
  filteredTagsByType,
  trailConditions
} from "../../reducers/selectors/selectors";

const mSTP = (state, ownProps) => {
  return {
    userId: state.session.currentUser.id,
    errors: state.errors.review,
    activity: defaultActivity(state),
    activities: filteredTagsByType(state, "activity"),
    trailConditions: filteredTagsByType(state, "obstacle"),
  };
};

const mDTP = (dispatch) => {
  return {
    createReview: (review) => dispatch(createReview(review)),
    closeModal: () => dispatch(closeModal()),
  };
};


class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log("review_form", this.props)
    const {review} = this.props

    // console.log("review_form", this.props.review)
    if (review) {
      console.log('######1',review)
      console.log("######2", review.tags);
    // console.log(
    //   "TAGS",
    //   Object.values(review.tags),
    //   // Object.values(review.tags).length,
    //   Object.values(review.tags).map(tag => tag.name)
    // );
    }

    console.log(
      "okk",
      review && review.tags
        ? Object.values(review.tags).map((tag) => tag.name)
        : []
    );
    this.state = {
      rating: review ? review.rating : "",
      review: review ? review.review : "",
      activity_date: review ? review.activityDate : "",
      // tag_ids: (review && ((Object.values(review.tags)).length > 0)) ? Object.values(review.tags.name) : [],
      tag_ids: (review && review.tags) ? Object.values(review.tags).map(tag => tag.name) : [],
      // tag_ids: [],
      // tag_ids: (review && review.tags) ? (Object.values(review.tags.name)) : console.log("elseif"),
      activity: this.props.activity,
    };

    this.update = this.update.bind(this);
    this.postReview = this.postReview.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
  }

  update(field) {
    return (e) =>
    this.setState({
      [field]: e.target.value,
    });
  }

  postReview(e) {
    e.preventDefault();

    // console.log("okasdoskad ", this.props.trailConditions);
    // console.log('gag sigsd ids are ', this.state.tag_ids);
    // console.log(
    //   "lel jnice",
    //   this.state.tag_ids.map(
    //     (tagName) =>
    //       this.props.trailConditions.filter((o) => o.name === tagName)[0].id
    //   )
    // );
    let newReview = {
      rating: this.state.rating,
      review: this.state.review,
      activity_date: this.state.activity_date,
      tag_ids: this.state.tag_ids.map(
        (tagName) =>
          this.props.trailConditions.filter((o) => o.name === tagName)[0].id
      ),
      user_id: this.props.userId,
      trail_id: this.props.trail.id,
    };

    this.props
      .createReview(newReview)
      .then(() => this.props.closeModal());
  }

  handleTagSelection(e) {
    e.preventDefault();

    const newTagName = e.target.textContent;
    // console.log(e.target.textContent)


    if (!this.state.tag_ids.includes(newTagName)) {
      this.setState({
        tag_ids: [...this.state.tag_ids, newTagName],
      });
    } else {
      const filtered = this.state.tag_ids.filter(tagName => tagName !== newTagName)
      this.setState({
        tag_ids: filtered
      })
    }
  }

  render() {

    let errors = null;
    if (this.props.errors) {
      errors = this.props.errors.map((error, idx) => {
        return (
          <ul className="review-errors" key={idx}>
            {error}
          </ul>
        );
      });
    }

    const printErrors = (error) => {
      if (this.props.errors.includes(error)) {
        return <ul className="review-errors">{error}</ul>;
      }
    };

    console.log('my selected tag naems are', this.state.tag_ids);
    console.log("this.props.trailConditions", this.props.trailConditions);
    const trailConditionsTags = (
      <>
        {this.props.trailConditions.map((trailConditions) => (
          <span
            key={trailConditions.id}
            onClick={this.handleTagSelection}
            className={
              this.state.tag_ids.includes(trailConditions.name)
                ? "review-form-tag-selected"
                : "review-form-tag"
            }
          >
            {/* {console.log(this.state.tag_ids)} */}
            {trailConditions.name}
          </span>
        ))}
      </>
    );

    return (
      <form className="review-form-modal">
        {/* <div className="review-form-modal" onClick={}> */}
        <div className="review-form-x-wrapper">
          <button className="review-form-x">
            <svg
              className="MuiSvgIcon-root"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              onClick={this.props.closeModal}
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
          <div className="review-trail-name">{this.props.trail.name}</div>

          <div className="review-form-body">
            <div className="rating-select-wrapper">
              <div className="rating-select" onChange={this.update("rating")}>
                <input
                  type="radio"
                  id="five"
                  name="rating"
                  value="5"
                  defaultChecked={this.state.rating === 5}
                />
                <label htmlFor="five" className="review-star"></label>
                <input
                  type="radio"
                  id="four"
                  name="rating"
                  value="4"
                  defaultChecked={this.state.rating === 4}
                />
                <label htmlFor="four" className="review-star"></label>
                <input
                  type="radio"
                  id="three"
                  name="rating"
                  value="3"
                  defaultChecked={this.state.rating === 3}
                />
                <label htmlFor="three" className="review-star"></label>
                <input
                  type="radio"
                  id="two"
                  name="rating"
                  value="2"
                  defaultChecked={this.state.rating === 2}
                />
                <label htmlFor="two" className="review-star"></label>
                <input
                  type="radio"
                  id="one"
                  name="rating"
                  value="1"
                  // required
                  defaultChecked={this.state.rating === 1}
                />
                <label htmlFor="one" className="review-star"></label>
              </div>
              {printErrors("Rating can't be blank")}
            </div>
            <textarea
              onChange={this.update("review")}
              className="review-text"
              placeholder="Share your thoughts."
              // required
              value={this.state.review}
            ></textarea>
            {printErrors("Review can't be blank")}
            <div className="activity-date-wrapper">
              <div className="review-form-subheader">Activity</div>
              <select
                onChange={this.update("activity")}
                className="activity-dropdown"
                value={this.state.selectedActivity}
                // required
              >
                {this.props.activities.map((activity) => (
                  <option className="activity-tags" key={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
              <div className="activity-space"></div>
              <input
                onChange={this.update("activity_date")}
                type="date"
                className="activity-date"
                value={this.state.activity_date}
                // required
              />
            </div>
            {printErrors("Activity date can't be blank")}
            {printErrors(
              "Activity date - only one review allowed for this trail on this date"
            )}
            <div className="trail-conditions-wrapper">
              <div className="review-form-subheader">
                Trail Conditions
                <div className="optional">&nbsp; &nbsp;(optional)</div>
              </div>
              <div className="review-form-tag-wrapper">
                {trailConditionsTags}
              </div>
            </div>
            <div className="review-form-btn-wrapper">
              <div className="cancel-btn" onClick={this.props.closeModal}>
                Cancel
              </div>
              <div
                className="post-btn"
                onClick={this.postReview}
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(mSTP, mDTP)(ReviewForm);


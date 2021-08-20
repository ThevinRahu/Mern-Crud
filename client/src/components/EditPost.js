import React, { Component } from "react";
import axios from "axios";
export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      description: "",
      postCategory: "",
      price:""
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/posts/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          topic: res.data.post.topic,
          description: res.data.post.description,
          postCategory: res.data.post.postCategory,
          price: res.data.post.price,
        });
        console.log(this.state.post);
      }
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { topic, description, postCategory, price } = this.state;

    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
      price:price,
    };

    console.log(data);
    axios.put(`/post/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Post Updated!");
        this.setState({
          topic: "",
          description: "",
          postCategory: "",
          price:""
        });
      }
    });
  };
  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <br></br>
        <form>
          <div className="form-group h3 mb-3 font-weight-normal">
            <label for="topic">Topic</label>
            <input
              type="text"
              className="form-control"
              id="topic"
              name="topic"
              placeholder="Topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group h3 mb-3 font-weight-normal">
            <label for="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group h3 mb-3 font-weight-normal">
            <label for="postCategory">Post Category</label>
            <input
              type="text"
              className="form-control"
              id="postCategory"
              name="postCategory"
              placeholder="Post Category"
              value={this.state.postCategory}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group h3 mb-3 font-weight-normal">
            <label for="postCategory">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </div>
          <br></br>
          <div class="col-sm-10">
            <button
              className="btn btn-success"
              type="submit"
              style={{ marginTop: "15px" }}
              onClick={this.onSubmit}
            >
              <i className="fas fa-save"></i>&nbsp;Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

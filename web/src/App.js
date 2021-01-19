import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 20,
      currentPage: 0
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }
  receivedData() {
    axios
      .get(`https://api.enye.tech/v1/challenge/records`)
      .then(res => {

        const data = res.data.records.profiles;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(profile => <React.Fragment>
          <tr>
            <td>{profile.FirstName}</td>
            <td>{profile.LastName}</td>
            <td>{profile.Gender}</td>
            <td>{profile.CreditCardNumber}</td>
            <td>{profile.Email}</td>
            <td>{profile.PaymentMethod}</td>
          </tr>
          {/* <p>{pd.title}</p>
                  <img src={pd.thumbnailUrl} alt=""/> */}
        </React.Fragment>)

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),

          postData
        })
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });

  };

  componentDidMount() {
    this.receivedData()
  }
  render() {
    return (
      <div id="wrapper">
        <div>
       
        </div>
        <table>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>CreditCardNumber</th>
            <th>Email</th>
            <th>PaymentMethod</th>
          </tr>
          {this.state.postData}
        </table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </div>

    )
  }
}

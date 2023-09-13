import React, { Component } from 'react';
import { Col, Card, CardBody } from 'reactstrap';

class Counter3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalList: [],
      client_id: '',
      access_token: '',
    };
  }

  async componentDidMount() {
    const access = JSON.parse(localStorage.getItem('access_token'));
    //const id = JSON.parse(localStorage.getItem('client_id'));
    if (access) {
      this.setState({ access_token: access });
      //this.setState({ client_id: id });
    }

    try {
      const hospitalResponse = await fetch('http://194.163.40.231:8080/Hospital/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
      });

      if (hospitalResponse.ok) {
        const hospitalData = await hospitalResponse.json();
        this.setState({ hospitalList: hospitalData });
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  }

  render() {
    const { hospitalList } = this.state;
    const hospitalCount = hospitalList.length;

    const reports = [
    //   { title: 'Total Patients', icon: 'mdi mdi-account', rate: '10%' },
    //   { title: 'Total Doctors', icon: 'mdi mdi-stethoscope', rate: '5%' },
    //   { title: 'Total Appointments', icon: 'mdi mdi-calendar-clock', rate: '15%' },
      { title: 'Total Hospitals', icon: 'mdi mdi-hospital', rate: '20%' },
    ];

    return (
      <React.Fragment>
        {reports.map((report, index) => (
          <Col md={4} key={index}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">{report.title}</p>
                    {report.title === 'Total Hospitals' ? (
                      <h4 className="mb-0">{hospitalCount}</h4>
                    ) : (
                      <h4 className="mb-0">{this.state.dataArray[index]?.total_count}</h4>
                    )}
                  </div>
                  <div className="text-primary">
                    <i className={report.icon + ' font-size-24'}></i>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}

export default Counter3;

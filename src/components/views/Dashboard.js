import React, { Component } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import {
  logoutUser,
  getHospitalAdminDashboardMetrics,
  getAdminDashboardMetrics,
} from "../../actions";
import { connect } from "react-redux";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { HOSPITAL_ADMIN_ROLE, ADMIN_ROLE } from "../../constants";

// const Dashboard = () => {

// }

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props.auth);
    this.state = {};
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.auth?.role) {
      let { role } = this.props.auth;
      // debugger;
      if (role === HOSPITAL_ADMIN_ROLE) {
        await this.props.getHospitalAdminDashboardMetrics({
          hospitalId: this.props.auth.hospitalAdmin.hospitalId,
        });
      }
      if (role === ADMIN_ROLE) {
        await this.props.getAdminDashboardMetrics();
        console.log(this.props.usersToMonthMetrics);
      }
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        {this.props.auth.role == HOSPITAL_ADMIN_ROLE && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <LineChart
                  width={730}
                  height={400}
                  data={this.props.appointmentToMonthMetrics}
                  margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="numAppointments"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <PieChart width={800} height={400}>
                  <Pie
                    isAnimationActive={false}
                    data={this.props.appointmentToStatusMetrics}
                    dataKey="values"
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        )}
        {this.props.auth.role == ADMIN_ROLE && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <LineChart
                  width={730}
                  height={400}
                  data={this.props.usersToMonthMetrics}
                  margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Number of users"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <LineChart
                  width={730}
                  height={400}
                  data={this.props.allAppointmentsToMonthMetrics}
                  margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Number of appointments"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    appointmentToMonthMetrics: state.hospitalAdmin?.metrics?.appointmentToMonth,
    appointmentToStatusMetrics:
      state.hospitalAdmin?.metrics?.appointmentToStatus,
    usersToMonthMetrics: state?.adminMetrics?.usersToMonth,
    allAppointmentsToMonthMetrics: state?.adminMetrics?.appointmentToMonth,
  };
};
export default connect(mapStateToProps, {
  logoutUser,
  getHospitalAdminDashboardMetrics,
  getAdminDashboardMetrics,
})(Dashboard);

import React, { Component } from "react";

class Datetime extends Component {
  render() {
    let datetime = this.props.value;
    let format = this.props.format ? this.props.format : "datetime";

    if (!datetime || datetime === "") {
      datetime = new Date();
    }

    return <React.Fragment>{this.parse(datetime, format)}</React.Fragment>;
  }

  parse = (date, format) => {
    let { second, minute, hour, day, month, year } = this.parseDatetime(date);

    switch (format) {
      case "year":
        return year;

      case "month":
        return month;

      case "day":
        return day;

      case "hour":
        return hour;

      case "minute":
        return minute;

      case "second":
        return second;

      case "date":
        return day + "." + month + "." + year;

      case "time":
        return hour + ":" + minute + ":" + second;

      case "timedate":
        return (
          hour +
          ":" +
          minute +
          ":" +
          second +
          " " +
          day +
          "." +
          month +
          "." +
          year
        );

      case "datetime":
      default:
        return (
          day +
          "." +
          month +
          "." +
          year +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second
        );
    }
  };

  parseDatetime = (date) => {
    let parsed = new Date(date);

    let second = parsed.getSeconds();
    let minute = parsed.getMinutes();
    let hour = parsed.getHours();
    let day = parsed.getDate();
    let month = parsed.getMonth() + 1;
    let year = parsed.getFullYear();

    second = second < 10 ? "0" + second : second;
    minute = minute < 10 ? "0" + minute : minute;
    hour = hour < 10 ? "0" + hour : hour;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return { second, minute, hour, day, month, year };
  };
}

export default Datetime;

import React, { Component } from 'react';
//الميثود اللى بترجع اكشن 
import { add_reminder, remove_reminder, clear_reminders } from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import log from './reminder.png';
class App extends Component {
    state = {
        text: '',
        date: new Date()
    }

    render_reminder = () => {
        const { reminders } = this.props;
        
        return (
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        if (reminder.text && reminder.date !=='') {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div>{reminder.text}</div>
                                <div>{moment(new Date(reminder.date)).fromNow()}</div>
                                <div className="closeIcon btn btn-danger"
                                    onClick={() => this.props.remove_reminder(reminder.id)}>X
                                 </div>
                            </li>
                        )
                        }
                    })
                }
            </ul>
        )
            
    }

    render() {
        return (
            <div className="App">
                <img src={log}/>
                <div className="reminder-title">
                    <h2>What Should U Do ?</h2>
                </div>
                <input

                    className="form-control"
                    type="text"
                    value={this.state.text}
                    placeholder="Enter What U Think..."
                    onChange={(e) => this.setState({ text: e.target.value })}
                />
                <DatePicker
                    className="form-control"
                    value={this.state.date}  
                    selected={this.state.date}
                    onChange={date => { this.setState({ date}) }}
                    showTimeSelect
                    placeholderText ="Enter the Date"
                    timeFormat="HH:mm"
                    timeCaption="Mytime"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />


                <button

                    onClick={() => {
                        if (this.state.text&&this.state.date!=='') {
                        this.props.add_reminder(this.state.text, this.state.date)
                        this.setState({ text: '', date: '' })
                        }
                    }}
                    className="btn btn-primary btn-block">
                    Add Reminder
                </button>
                 
                {this.render_reminder()}
                <button
                    onClick={() => this.props.clear_reminders()}
                    className="btn btn-danger btn-block">
                    Clear Reminder
                </button>
            </div>

        )
    }
}
function mapstateToprops(state) {
    return {
        reminders: state
    }
}
//الميثود دى بتربط بين الميثود اللى بترجع اكشن والملف بتاع الرديوسر
// function mapDispatchToProps(dispatch){
//     return{
//         add_Reminder: () =>dispatch(add_reminder())
//     }
// }
// export default connect (null,mapDispatchToProps )(App) 
//قلك بدل ما اعمل كل اللى فوق ده  ممكن اختصرها كده 
//export default connect (null,{add_reminder})(App) 

export default connect(mapstateToprops, { add_reminder, remove_reminder, clear_reminders })(App)
 //الميثود كونيكت دى بتربط الريدكس اللى هى ستورى  بالدسبتش
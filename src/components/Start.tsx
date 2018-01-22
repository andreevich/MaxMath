import * as React from 'react';
import '../styles/start.css';

const ACTIONS: string[] = ['+', '-'];

class Start extends React.Component<any, any> {
    state = {
        answer: 0,
        first: 0,
        second: 0,
        actionItem: 0,
        showAnswer: false
    };

    componentDidMount() {
        this.randomTask();
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomTask() {
        let arr = [this.getRandomInt(0, 9), this.getRandomInt(0, 20)];
        let action = this.getRandomInt(0, 1);
        if (action === 1) {
            arr.sort((a: number, b: number) => {
                return b - a;
            })
        }
        console.log(action, arr);
        this.setState({
            showAnswer: false
            , actionItem: action
            , first: arr[0]
            , second: arr[1]
            , answer: eval(arr[0] + ACTIONS[action] + arr[1])
        });
    }

    getAnswer(e: any) {
        e.stopPropagation();
        this.setState({showAnswer: !this.state.showAnswer})
    }

    render() {
        return <div className={'start-screen'} onClick={this.randomTask.bind(this)}>
            <div className={'task'} onClick={this.getAnswer.bind(this)}>
                <div>{this.state.first}</div>
                <div>{ACTIONS[this.state.actionItem]}</div>
                <div>{this.state.second}</div>
                <div>=</div>
                <div className={'result'}>{this.state.showAnswer ? this.state.answer : '??'}</div>
            </div>
        </div>;
    }
}

export default Start;
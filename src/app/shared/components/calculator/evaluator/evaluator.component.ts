import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-evaluator',
    templateUrl: './evaluator.component.html',
    styles: ['']
})
export class EvaluatorComponent implements OnInit, OnDestroy {
    command = new UntypedFormControl('', Validators.pattern(mathPattern));
    previousCalculatorCommand = 'Enter Expression to Calculate';

    private sub = new Subscription();

    ngOnInit(): void {
        this.sub = this.command.valueChanges
            .subscribe((value: string) => {
                const regex = new RegExp(mathPattern);
                const lastChar = value[value.length - 1];
                if (lastChar === '=') {
                    const command = value.substr(0, value.length - 1);
                    if (regex.test(command)) {
                        this.previousCalculatorCommand = `Evaluating : ${command}`;
                        // tslint:disable-next-line: no-eval
                        this.command.setValue(eval(command));
                    } else {
                        this.command.setValue('Invalid Expression');
                    }
                }
            });
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

const mathPattern = '^([1-9][0-9]*[\\.+\\-*\\/])*[1-9][0-9]*$';

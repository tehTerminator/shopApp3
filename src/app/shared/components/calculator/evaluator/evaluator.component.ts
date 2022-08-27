import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { evaluateString, mathPattern } from '../../../functions';

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
                const lastChar = value[value.length - 1];
                if (lastChar === '=') {
                    try {
                        this.command.setValue(evaluateString(value));
                        this.previousCalculatorCommand = value;
                    } catch (e) {
                        this.command.setValue('Invalid Expression');
                    }
                }
            });
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}



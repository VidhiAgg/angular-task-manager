import { trigger, transition, query, style, group, animate } from "@angular/animations";
//import this in app.ts file
export const fadeAnimation =
//with ths animation name we will apply animation to container-fluid which the router-outlet is present
/*
1.transition("/signup => /login")
2. "* <=> *" =>indicates the same animation should be exeuted on any state change
3.entry represents -> new page where user wants to go
4. leave represents -> the exsisting page
5. apply css prop. to bith these elements
6. {optional: true} -> skip applying css prop when router-outlet is not activated
        */
trigger("routeAnimations",[ 
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({opacity : 0}),
                    animate("0.4s", style({opacity: '1'}))
                ],{optional: true})
            ]),
                query(":leave",[
                    style({opacity : 1}),
                    animate("0.2s", style({opacity: '0'}))
            ],{optional: true}
            )
    ])
]);
export const slideUpAnimation =
    trigger("slideAnimations",[ 
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "translateY(100%)"}),
                    animate("0.6s", style({transform: "translateY(0%)"}))
                ],{optional: true})
            ]),
                query(":leave",[
                    style({transform: "translateY(0%)"}),
                    animate("0.6s", style({transform: "translateY(-100%)"}))
            ],{optional: true}
            )
    ])
]);

export const zoomUpAnimation = 
trigger("zoomUpAnimate",[
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "scale(0) translateY(100%)"}),
                    animate("0.6s", style({transform: "scale(1) translateY(0%)"}))
                ],{optional: true})
            ]),
                query(":leave",[
                    style({transform: "scale(1) translateY(0%)"}),
                    animate("0.2s", style({transform: "scale(0) translateY(-100%)"}))
            ],{optional: true}
            )
    ])
]);

export const zoomLeftAnimation= 
trigger("zoomLeftAnimate",[
    transition("* <=> *",[
        query(":enter, :leave",
            style({position : 'absolute', width: '98%'}),
            {optional: true}),
            group([
                query(":enter",[
                    style({transform: "scale(0) translateX(100%)"}),
                    animate("0.6s", style({transform: "scale(1) translateX(0%)"}))
                ],{optional: true})
            ]),
                query(":leave",[
                    style({transform: "scale(1) translateY(0%)"}),
                    animate("0.6s", style({transform: "scale(0) translateY(-100%)"}))
            ],{optional: true}
            )
    ])
]);


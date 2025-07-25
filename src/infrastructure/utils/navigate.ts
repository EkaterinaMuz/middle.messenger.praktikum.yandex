import { Router } from "../routing";

export function navigate(e: Event, path: string) {
    e.preventDefault();
    const router =  Router.getInstance();

    router.go(path);
}

export function back(e: Event) {
    e.preventDefault();

    const router =  Router.getInstance();

    router.back();
}

export function getIdParam() {
    const router =  Router.getInstance();

    return router.getIdParam();
}

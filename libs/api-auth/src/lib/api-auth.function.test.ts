import * as api_auth_function from "./api-auth.function"
// @ponicode
describe("api_auth_function.createJwksRsaClient", () => {
    test("0", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "dedicated", issuer: "accessdenied4u", algorithms: ["invdist", "kd_tree"], namespace: "Edmond", emailClaimName: "user123" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "dedicated", issuer: "accessdenied4u", algorithms: ["omp", "scrypt", "SHA256"], namespace: "Pierre Edouard", emailClaimName: "username" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "methodical", issuer: "!Lov3MyPianoPony", algorithms: ["lasso_lars", "auto", "SHA", "crypt"], namespace: "Jean-Philippe", emailClaimName: 123 })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "methodical", issuer: "$p3onyycat", algorithms: ["Greedy", "MD5", "Golomb", "hessian"], namespace: "George", emailClaimName: "user123" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "methodical", issuer: "NoWiFi4you", algorithms: ["threshold", "Golomb", "unsalted_sha1"], namespace: "Pierre Edouard", emailClaimName: "username" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            api_auth_function.createJwksRsaClient({ audience: "", issuer: "", algorithms: [], namespace: "", emailClaimName: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api_auth_function.getSigningKey", () => {
    test("0", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey("4.0.0-beta1\t")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey(10.23)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey(10.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey(-29.45)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            api_auth_function.getSigningKey(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("api_auth_function.identifyUserByRequestToken", () => {
    test("0", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(-0.5, "@", { audience: "logistical", issuer: "accessdenied4u", algorithms: ["crypt"], namespace: "Anas", emailClaimName: "user-name" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(12345, ",", { audience: "logistical", issuer: "$p3onyycat", algorithms: ["crypt"], namespace: "Anas", emailClaimName: "user name" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(-0.5, "-", { audience: "logistical", issuer: "accessdenied4u", algorithms: ["X15", "Golomb", "lasso_lars", "MD5"], namespace: "George", emailClaimName: "user_name" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(true, "~", { audience: "value-added", issuer: "YouarenotAllowed2Use", algorithms: ["partner_ref", "unrecognized algorithm: '%s'"], namespace: "Michael", emailClaimName: "user_name" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(-1.0, "-", { audience: "4th generation", issuer: "NoWiFi4you", algorithms: ["sha1"], namespace: "Michael", emailClaimName: "username" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            api_auth_function.identifyUserByRequestToken(-Infinity, "", { audience: "", issuer: "", algorithms: [], namespace: "", emailClaimName: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})

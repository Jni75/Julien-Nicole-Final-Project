#[test_only]
module devhub::devcard_test {
    use sui::test_scenario;
    use devhub::devcard::{Self, DevHub, DevCard};
    use sui::coin;
    use sui::sui::SUI;
    use sui::transfer;

    #[test]
    fun test_create_card() {
        let owner = @0xA;

        let scenario_val = test_scenario::begin(owner);
        let scenario = &mut scenario_val;

        test_scenario::next_tx(scenario, owner);
        {
            devcard::init_for_testing(test_scenario::ctx(scenario));
        };

        test_scenario::next_tx(scenario, owner);
        {
            //Borrow DevHub
            let devhub = test_scenario::take_shared<DevHub>(scenario);

            let ctx = test_scenario::ctx(scenario);
            //Get some Coin
            let coin = coin::mint_for_testing<SUI>(5, ctx);
            let balance_mut = coin::balance_mut(&mut coin);
            let payment = coin::take(balance_mut, 1, ctx);

            //Create card
            devcard::create_card(
                b"Julien Nicole",
                b"Senior developer",
                b"https://media.licdn.com/dms/image/C4E03AQH_S0aurCaO5w/profile-displayphoto-shrink_200_200/0/1642535386354?e=1709769600&v=beta&t=jVUWwXpgQt00yyDfjP2QeBRtx1GF1lTpVNMDR3aV1R4",
                20,
                b"dotnet,react,typescript",
                b"https://www.linkedin.com/in/juliennicole/",
                b"j.nicole@e-nnov.fr",
                payment,
                &mut devhub,
                ctx);
            assert!(!test_scenario::has_most_recent_for_sender<DevCard>(scenario), 0);
            
            //Burn left Coin
            transfer::public_transfer(coin, @0x0);
            //Release DevHub
            test_scenario::return_shared(devhub);
        };

        test_scenario::end(scenario_val);
    }
}

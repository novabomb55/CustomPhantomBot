(function(){
	
	var firstClaim = "",
		secondClaim = "";

	$.bind('command', function(event) {
		var sender = event.getSender().toLowerCase(),
            username = $.username.resolve(sender, event.getTags()),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            actionArg1 = args[1],
            actionArg2 = args[2];
		

		if (command.equalsIgnoreCase('first')) 
		{
			if (username.equalsIgnoreCase("nononom12"))
			{
				firstClaim = "nononom12";
				secondClaim = "nononom12";
			}
			
			if (!secondClaim.equalsIgnoreCase(username))
				
				if (firstClaim.equalsIgnoreCase("") && $.getUserPoints(sender) < 3000)
				{
					firstClaim = username;
					$.inidb.incr('points', sender, 250);
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.first'));
				}
				else
				{
					if (secondClaim.equalsIgnoreCase("") && !firstClaim.equalsIgnoreCase(""))
					{
						$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.unclaim', firstClaim));
					}
					else
					{
						if ($.getUserPoints(sender) >= 3000)
						{
							$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.tomanyair'));
						}
						else 
						{
							$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.claimed', firstClaim, secondClaim));
						}
					}
				}
			else
			{
				$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.claimed'));
				$.inidb.decr('points', sender, 75);
				return;
			}
		}
		//Rewards the 2nd person in chat
		if (command.equalsIgnoreCase('second'))
		{	
			if (!firstClaim.equalsIgnoreCase(username))
			{
				if (secondClaim.equalsIgnoreCase("") && $.getUserPoints(sender) < 3000)
				{
					secondClaim = username;
					$.inidb.incr('points', sender, 150);
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.second'));
				}
				else 
				{
					if (firstClaim.equalsIgnoreCase("") && !firstClaim.equalsIgnoreCase(""))
					{
						$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.unclaim', secondClaim));
						return;
					}
					else
					{
						if ($.getUserPoints(sender) >= 3000)
						{
							$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.tomanyair'));
						}
						else 
						{
							$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.claimed', firstClaim, secondClaim));
							return;
						}
					}
				}
			}
			else
			{
				$.say($.whisperPrefix(sender) + $.lang.get('customscript.botcommands.secondfail'));
				$.inidb.decr('points', sender, 125);
				return;
			}
		}
		
		//Random chance to give points to the user
		if (command.equalsIgnoreCase('lifesupport'))
		{
			amount = $.randRange(1, 100);
			$.consoleLn("Amount = " + amount);
		
			if (amount == 1)
			{
					$.say($.lang.get('customscript.air.nothing', sender));
			}
				if (amount <= 5 && amount != 1)
			{
				win = $.randRange(1, 10);
				$.inidb.incr('points', sender, win);
				$.say($.lang.get('customscript.air.winner', sender, win));
			}
			if (amount > 5 && amount < 40)
			{
				win = $.randRange(10, 25);
				$.inidb.incr('points', sender, win);
				$.say($.lang.get('customscript.air.winner', sender, win));
			}	
			if (amount >= 40 && amount < 95)
			{
				win = $.randRange(25, 50);
				$.inidb.incr('points', sender, win);
				$.say($.lang.get('customscript.air.winner', sender, win));
			}
			if (amount >= 95 && amount != 100)
			{
				win = $.randRange(50, 99);
				$.inidb.incr('points', sender, win);
				$.say($.lang.get('customscript.air.winner', sender, win));
			}
			if (amount == 100)
			{
				$.inidb.incr('points', sender, 100);
				$.say($.lang.get('customscript.air.bigwin', sender, 100));
			}
		}
		
		 
		 //Nom's custom store
		 if (command.equalsIgnoreCase('Buy')) {
			if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('customscript.store.err'));
                return;
            }
			
			if (action.equalsIgnoreCase("Ignis"))
			{
				if ($.getUserPoints(sender) >= 100)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Ignis Wraith", sender));
					$.say($.lang.get('customscript.store.purchase', "Ignis"));
					$.inidb.decr('points', sender, 100);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 100, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("VIP"))
			{
				if ($.getUserPoints(sender) >= 5000)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "VIP Badge", sender));
					$.say($.lang.get('customscript.store.purchase', "VIP"));
					$.inidb.decr('points', sender, 5000);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 5000, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Akbolto"))
			{
				if ($.getUserPoints(sender) >= 500)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Akbolto Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Akbolto"));
					$.inidb.decr('points', sender, 500);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 500, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Tenora"))
			{
				if ($.getUserPoints(sender) >= 750)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Tenora Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Tenora"));
					$.inidb.decr('points', sender, 750);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 750, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Stahlta"))
			{
				if ($.getUserPoints(sender) >= 600)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Stahlta", sender));
					$.say($.lang.get('customscript.store.purchase', "Stahlta"));
					$.inidb.decr('points', sender, 600);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 600, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Akjagara"))
			{
				if ($.getUserPoints(sender) >= 750)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Akjagara Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Akjagara"));
					$.inidb.decr('points', sender, 750);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 750, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Stradavar"))
			{
				if ($.getUserPoints(sender) >= 350)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Stradavar Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Stradavar"));
					$.inidb.decr('points', sender, 350);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 350, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Panthera"))
			{
				if ($.getUserPoints(sender) >= 500)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Panthera Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Panthera"));
					$.inidb.decr('points', sender, 500);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 500, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Ninkondi"))
			{
				if ($.getUserPoints(sender) >= 500)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Ninkondi Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Ninkondi"));
					$.inidb.decr('points', sender, 500);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 500, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Pandero"))
			{
				if ($.getUserPoints(sender) >= 500)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Pandero Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Pandero"));
					$.inidb.decr('points', sender, 500);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 500, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Gorgon"))
			{
				if ($.getUserPoints(sender) >= 150)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Gorgon Wraith", sender));
					$.say($.lang.get('customscript.store.purchase', "Gorgon"));
					$.inidb.decr('points', sender, 150);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 150, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Pyrana"))
			{
				if ($.getUserPoints(sender) >= 250)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Pyrana Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Pyrana"));
					$.inidb.decr('points', sender, 250);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 250, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Orthos"))
			{
				if ($.getUserPoints(sender) >= 300)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Orthos Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Orthos"));
					$.inidb.decr('points', sender, 300);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 300, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Buzzkill"))
			{
				if ($.getUserPoints(sender) >= 150)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Buzzkill", sender));
					$.say($.lang.get('customscript.store.purchase', "Buzzkill"));
					$.inidb.decr('points', sender, 150);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 150, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Ordnance"))
			{
				if ($.getUserPoints(sender) >= 400)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Ordnance Cheap Shot", sender));
					$.say($.lang.get('customscript.store.purchase', "Ordnance"));
					$.inidb.decr('points', sender, 400);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 400, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Power"))
			{
				if ($.getUserPoints(sender) >= 150)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Power Drift", sender));
					$.say($.lang.get('customscript.store.purchase', "Power"));
					$.inidb.decr('points', sender, 150);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 150, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Void"))
			{
				if ($.getUserPoints(sender) >= 250)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Void Hole", sender));
					$.say($.lang.get('customscript.store.purchase', "Void"));
					$.inidb.decr('points', sender, 250);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 250, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Condition"))
			{
				if ($.getUserPoints(sender) >= 200)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Condition Overload", sender));
					$.say($.lang.get('customscript.store.purchase', "Condition"));
					$.inidb.decr('points', sender, 200);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 200, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Creeping"))
			{
				if ($.getUserPoints(sender) >= 250)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Creeping Bullseye", sender));
					$.say($.lang.get('customscript.store.purchase', "Creeping"));
					$.inidb.decr('points', sender, 250);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 250, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Drifting"))
			{
				if ($.getUserPoints(sender) >= 150)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Drifting Contact", sender));
					$.say($.lang.get('customscript.store.purchase', "Drifting"));
					$.inidb.decr('points', sender, 150);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 150, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Boar"))
			{
				if ($.getUserPoints(sender) >= 750)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Boar Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Boar"));
					$.inidb.decr('points', sender, 750);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 750, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Baza"))
			{
				if ($.getUserPoints(sender) >= 400)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Baza Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Baza"));
					$.inidb.decr('points', sender, 400);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 400, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Corinth"))
			{
				if ($.getUserPoints(sender) >= 450)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Corinth Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Corinth"));
					$.inidb.decr('points', sender, 450);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 450, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Boltor"))
			{
				if ($.getUserPoints(sender) >= 700)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Boltor Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Boltor"));
					$.inidb.decr('points', sender, 700);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 700, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Aksomati"))
			{
				if ($.getUserPoints(sender) >= 400)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Aksomati Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Aksomati"));
					$.inidb.decr('points', sender, 400);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 400, sender));
				}
				return;
			}
			if (action.equalsIgnoreCase("Zakti"))
			{
				if ($.getUserPoints(sender) >= 400)
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.success', "Zakti Prime", sender));
					$.say($.lang.get('customscript.store.purchase', "Zakti"));
					$.inidb.decr('points', sender, 400);
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.store.fail', $.getUserPoints(sender), 400, sender));
				}
				return;
			}
			
		}
		
		//Check if a user is a regular on stream
		if (command.equalsIgnoreCase('regularstatus'))
		{
			if (action)
			{
				if ($.isReg(action))
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.isregular.success'));
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.isregular.fail'));
				}
			}
			else
			{
				if ($.isReg(sender))
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.isregular.success'));
				}
				else
				{
					$.say($.whisperPrefix(sender) + $.lang.get('customscript.isregular.fail'));
				}
			}
		}
		
		//Guess a number game
		if (command.equalsIgnoreCase('guess'))
		{
			ranNumber = $.randRange(1, 15);
			$.consoleLn("Random number: " + ranNumber);
			if (action == ranNumber)
			{
				$.say($.lang.get('customscript.guess.won', sender));
			}
			else
			{
				$.say($.lang.get('customscript.guess.lose', sender, ranNumber));
			}
		}
		
		//Refunds giveaway
		if (command.equalsIgnoreCase('refund'))
		{
			refundGiveaway();
			//Say all good man
		}
		
		if (command.equalsIgnoreCase('price'))
		{
			var data, reroll, unroll, counter1 = 0, counter2 = 0;
			
			const rerollArr = [];
			const unrollArr = [];
			
			data = jsonGet('http://n9e5v4d8.ssl.hwcdn.net/repos/weeklyRivensPS4.json');
			
			$.consoleLn(action);
			
			$.consoleLn('Searching');
			for (var count = 0; count < 650; count++)
			{
				riven = JSON.stringify(data[count])
				
				if(riven)
				{
					if (actionArg1)
					{
						if (riven.includes(action.toUpperCase() + " " + actionArg1.toUpperCase()))
						{
							if (riven.includes("\"rerolled\":false"))
							{
								//Add values to a array to compare to prevent duplicates
								unrollArr[counter1] = riven;
								$.consoleLn("Unrolled : " + unrollArr[counter1]);
								counter1++;
							}
							if (riven.includes("\"rerolled\":true"))
							{
								//Add values to a array to compare to prevent duplicates
								rerollArr[counter2] = riven;
								$.consoleLn("Rerolled : " + rerollArr[counter2]);
								counter2++;
							}
						}
					}
					else
					{
						if (riven.includes(action.toUpperCase()))
						{
							if (riven.includes("\"rerolled\":false")) 
							{
								//Add values to a array to compare to prevent duplicates
								unrollArr[counter1] = riven;
								//$.consoleLn("Unrolled : " + unrollArr[counter1]);
								counter1++;
							}
							if (riven.includes("\"rerolled\":true"))
							{
								//Add values to a array to compare to prevent duplicates
								rerollArr[counter2] = riven;
								//$.consoleLn("rerolled : " + rerollArr[counter2]);
								counter2++;
							}
						}
					}
				}
				else
				{
					count = 650;
				}
			}
			
			var complete, complete2;
			var name, rerollStatus, avg, min, max, medium, pop;
			counter1 = 0;
			for (var count = 0; count < 1; count++)
			{
				for (var count2 = 0; count2 < rerollArr[count].length; count2++)
				{
					if (rerollArr[count].charAt(count2) == '"')
					{
						counter1++;
					}
					
					if (counter1 == 6)
					{
						complete = rerollArr[count].substring(count2, rerollArr[count].length);
						previous = count2;
						//$.say("Reroll Output: " + firstHalf + "\n" + secondHalf);
						//count2 = rerollArr[count].length;
						//counter1 = 0;
						//$.consoleLn("Reroll Output: " + rerollArr[count].substring(count2, rerollArr[count].length));
					}
					
					if (counter1 == 7)
					{
						$.consoleLn("Reroll Output: " + complete);
						name = complete.substring(2, count2-previous+1);
						$.consoleLn("Name Output: " + name);
					}
					//idc about 8th
					if (counter1 == 9)
					{
						complete = complete.substring(count2-previous, complete.length);
						previous = count2;
					}
					if (counter1 == 10)
					{
						rerollStatus = complete.substring(3, count2-previous);
						$.consoleLn("RerollStatus Output: " + rerollStatus);
					}
					if (counter1 == 11)
					{
						complete = complete.substring(count2-previous, complete.length);
						previous = count2;
					}
					if (counter1 == 12)
					{
						avg = complete.substring(3, count2-previous);
						$.consoleLn("avg Output: " + avg);
					}

					
				}
			}
			
			/*counter2 = 0;
			for (var count = 0; count < unrollArr.length; count++)
			{
				
			}*/
			
			
			$.consoleLn('Search ended');
		}
		
	});
	
	var Shoutouted = new Array();
	var SubCalled = new Array();
	$.bind('ircChannelMessage', function(event) {
			var sender = event.getSender();
			var Streamers = ["oRakuen","Blindkreaper" ,"KimonoKat","knightsdemon231xx", "dreamzangels", "detroit_619_gamer", "Rolling_Strings3", "lessvestige", "wikiwing", "NewGamerDad360", "DreamzAngels", "teething_korea", "dangersvoice", "Groovyguygaming", "Gwyd_w", "AznSlickSlaya", "WabbaPlays", "Anfffy", "imamfnprincess", "Jimmy0Ghost", "myheartstempo", "sleepygamekill", "KingRayRay_Ray"];
			
			for (x = 0; x < Streamers.length; x++)
			{
				if (sender.equalsIgnoreCase(Streamers[x]))
				{
					if (!Shoutouted.includes(sender))
					{
						$.say("Please check out " + sender + " a fellow streamer @ https://www.twitch.tv/" + sender + "! Last seen playing " + $.getGame(sender));
						Shoutouted.push(sender);
					}
				}
			}
			
			if (event.getTags().get('subscriber').equals('1'))
			{
				if(!SubCalled.includes(sender))
				{
					if (sender.equalsIgnoreCase("wneonprince1"))
					{
						$.say("well this person is here");
						$.alertspollssocket.triggerAudioPanel('Wneo')
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("IceyRift"))
					{
						$.say("The Arbiter of the Rift has arrived");
						$.alertspollssocket.triggerAudioPanel('Rifty');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("Spookypenguin1"))
					{
						$.alertspollssocket.triggerAudioPanel('John Cena');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("VitalScore"))
					{
						$.alertspollssocket.triggerAudioPanel('Vital');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("jimmy0ghost"))
					{
						$.alertspollssocket.triggerAudioPanel('Rick roll');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("shirogane_88"))
					{
						$.alertspollssocket.triggerAudioPanel('Seeker');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("icelightning1221"))
					{
						$.say("Cold as ice to meet shocking as lightning to know");
						$.alertspollssocket.triggerAudioPanel('IceLightning');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("BlazingGamer33"))
					{
						$.alertspollssocket.triggerAudioPanel('BlazingIntro');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("Distronic4"))
					{
						$.alertspollssocket.triggerAudioPanel('Distronic');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("iam_eclipse"))
					{
						$.alertspollssocket.triggerAudioPanel('Enter');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("ShortFuze17"))
					{
						$.alertspollssocket.triggerAudioPanel('Short');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("Novabomb248"))
					{
						$.alertspollssocket.triggerAudioPanel('Nova');
						SubCalled.push(sender);
					}
					if (sender.equalsIgnoreCase("Fakeforlife1"))
					{
						$.alertspollssocket.triggerAudioPanel('Fake');
						SubCalled.push(sender);
					}
					/*if (sender.equalsIgnoreCase("Nononom12"))
					{
						$.alertspollssocket.triggerAudioPanel('Vital\'s Jackson 5');
						SubCalled.push(sender);
					}*/
				}
			}
		})
		

	$.bind('initReady', function() {
        $.registerChatCommand('./custom/Custom Scripts.js', 'lifesupport', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'bonustime', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'first', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'second', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'buy', 7);
		$.registerChatCommand('./systems/ticketraffleSystem.js', 'amount', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'regularstatus', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'refund', 1);
		$.registerChatCommand('./custom/Custom Scripts.js', 'guess', 7);
		$.registerChatCommand('./custom/Custom Scripts.js', 'price', 7);
		//$.registerChatCommand('./systems/ticketraffleSystem.js', 'max', 7);
    });
})();

		const m = 1000;
		const n = 2;
		var backup, notFound, ticketPrice, event, subTMulti;
		//Event needs to be passed from ticketraffleSystem via command
		//like getEvent(event)
		createArray();
		function createArray()
		{
			$.consoleLn("Created Array!");
			backup = new Array(m); // create an empty array of length n
			for (var i = 0; i < m; i++) {
				backup[i] = new Array(n); // make each element an array
			}

			notFound = true;
		}
		
		function backupGiveaway(times, user, cost, subValue)
		{
			//$.consoleLn("notFound = " + notFound);
			var count1;
			ticketPrice = cost;
			subTMulti = subValue;
			//$.consoleLn("Backup length = " + backup.length);
			for (count1 = 0; count1 < backup.length; count1++)
			{
				//$.consoleLn("times = " + times);
				if (backup[count1][0] != undefined)
				{
					if (backup[count1][0].equalsIgnoreCase(user))
					{
						backup[count1][1] += times;
						count1 = backup.length;
						$.consoleLn("Successfully found a " + user + " in the backup giveaway array");
						notFound = false;
					}
				}
				else
				{
					count1 = backup.length;
				}
			}
			
			if (notFound === true)
			{
				for (count1 = 0; count1 < backup.length; count1++)
				{
					if (backup[count1][0] === undefined)
					{
						backup[count1][0] = user;
						backup[count1][1] = times;
						$.consoleLn("Successfully added " + user + " to backup giveaway array");
						count1 = backup.length;
					}
				}
			}
			
			x = 0;
			while(backup[x][0])
			{
				$.writeToFile("!air add " + backup[x][0] + " " + backup[x][1]*ticketPrice, './scripts/custom/BackupGiveaway.txt', true);
				x++
			}
				
			for (count1 = 0; count1 < 5; count1++)
			{
				$.consoleLn("We have " + backup[count1][0] + " with " + backup[count1][1] + " entries");
			}
		}
		
		function refundGiveaway()
		{
			var user, times;
			$.consoleLn("price = " + ticketPrice);
			for (var count = 0; count < backup.length; count++)
			{
				user = backup[count][0];
				times = backup[count][1];
				
				if (backup[count][0] != undefined)
				{
					$.consoleLn("Event = " + event);
					if (event)
					{
						$.inidb.incr('points', user, (times*ticketPrice)/subTMulti);
						$.consoleLn("Refunded " + user + " " + (times*ticketPrice)/subTMulti + " air");
					}
					else
					{
						$.inidb.incr('points', user, times*ticketPrice);
						$.consoleLn("Refunded " + user + " " + times*ticketPrice + " air");
					}
				}
			}
		}
		
		/**
		* @param {string} path
		* @returns {Packages.com.gmt2001.HttpResponse}
		*/
		function jsonGet(path) {
			
			var url = path;
			
			var HttpRequest = Packages.com.gmt2001.HttpRequest;

			var headers = new java.util.HashMap();
			headers.put('Accept', 'application/json');

			var responseData = HttpRequest.getData(HttpRequest.RequestType.GET, url, null, headers);
			if (responseData.success) {
				
				return JSON.parse(responseData.content);
			}
			return null;
		}
